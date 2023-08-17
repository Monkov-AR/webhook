import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineEvent } from './entities/line-event.entity';
import { EventType, CreateLineEventDto } from './dto/create-line-event.dto';
import { UpdateLineEventDto } from './dto/update-line-event.dto';
import { LineBotService } from '../config/config.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConfigService } from '@nestjs/config';
import { LinkstaffApiService } from 'src/api/linkstaff-api/linkstaff-api.service';

@Injectable()
export class LineEventsService {
  constructor(
    @InjectRepository(LineEvent)
    private readonly lineEventRepository: Repository<LineEvent>,
    private readonly httpService: HttpService, // Inject HttpService
    private lineBotService: LineBotService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private linkstaffApiService: LinkstaffApiService,
  ) { }

  LINE_CHANNEL_ACCESS_TOKEN = this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN');
  LINE_CHANNEL_SECRET = this.configService.get<string>('LINE_CHANNEL_SECRET');
  LINE_BROADCAST_URL = this.configService.get<string>('LINE_BROADCAST_URL');
  LINE_API_URL = this.configService.get<string>('LINE_API_URL');

  async handleUnfollowEvent(eventData) {
    console.log("webhook request:", eventData);
    return console.log('UNFOLLOW EVENT')
  }

  async handleFollowEvent(eventData) {
    const userId = eventData.source.userId;
    const email = '';
    // Check if an event with the same userId already exists
    console.log("FOLLOW EVENT");
    console.log("webhook request:", eventData);
    const existingUser = await this.lineEventRepository.findOne({
      where: { userId: userId },
    });
    if (!existingUser) {
      const createLineEventDto: CreateLineEventDto = {
        type: eventData.type,
        userId: userId,
        email: email,
      };
      const lineEvent = this.lineEventRepository.create(createLineEventDto);
      await this.lineEventRepository.save(lineEvent);
      const responseMessage = 'Thank you for following us!';
      return lineEvent;

    } else {
      const errorMessage = `LineEvent with userId '${userId}' already exists`;
      throw new HttpException(errorMessage, HttpStatus.CONFLICT); // Return a conflict response
    }

  }

  async handleMessageEvent(eventData) {

    const messageType = eventData.message.type;
    const userMessage = eventData.message.text;
    const replyToken = eventData.replyToken;

    const replyMessage =
      "投稿種別：" + messageType + "\n投稿内容：" + userMessage;
    let messages = [];
    let payload;

    console.log(messageType, userMessage, replyToken)

    switch (userMessage) {
      // getVacancy: send simple message
      case "getVacancy":
        messages.push({
          type: "text",
          text: "vacancy list['1','2','3']",
        });
        break;
      // on: subscribe to news
      case "on":
        messages.push({
          type: "text",
          text: "Set to on",
        });
        break;
      // off: unsubscribe to news
      case "off":
        messages.push({
          type: "text",
          text: "Set to off",
        });
        break;
      // GetCard: send to line carousel object
      case "getCard":
        const vacancies = await this.getVacancies();
        messages.push(this.utilsService.createMessage(vacancies));
        break;
      // help: send simple text message
      case "help":
        messages.push({
          type: "text",
          text:
            "command list:" +
            "\n getVacancy" +
            "\n getCard" +
            "\n on" +
            "\n off" +
            "\n help",
        });
        break;
      // broadcast: send broadcast message to all users
      case "broadcast":
        this.sendBroadcastMessage("text");
        messages.push({
          type: "text",
          text: "Broadcast wad sended",
        });
        break;
      // default: repeat user message
      default:
        messages.push({
          type: "text",
          text: replyMessage,
        });
    }

    if (messages.length > 0) {
      payload = await this.lineBotService.createLinebotClient().
        replyMessage(replyToken, messages);

      try {
        const response = await fetch(this.LINE_API_URL, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + this.LINE_CHANNEL_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Ошибка при выполнении запроса: ' + response.status);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Ошибка при выполнении запроса: ' + error.message);
      }
    }
    console.log("SEND PAYLOAD");
  }

  async handleEvent(eventData) {

    const eventType = eventData.type;

    if (eventType === EventType.Follow) {
      return this.handleFollowEvent(eventData);
    }

    if (eventType === EventType.Unfollow) {
      return this.handleUnfollowEvent(eventData);
    }

    if (eventType === EventType.Message) {
      return this.handleMessageEvent(eventData);
    }

  }

  async sendBroadcastMessage(message: any): Promise<any> {

    const payload = {
      messages: [
        {
          type: "text",
          text: "Hello, world1",
        },
        {
          type: "text",
          text: "Hello, world2",
        },
      ],
    };

    try {
      const response = await fetch(this.LINE_BROADCAST_URL, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.LINE_CHANNEL_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса: ' + response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Ошибка при выполнении запроса: ' + error.message);
    }

  }

  async getVacancies() {
    return await this.linkstaffApiService.getVacancies();
  }

  findAll() {
    return `This action returns all lineEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lineEvent`;
  }

  update(id: number, updateLineEventDto: UpdateLineEventDto) {
    return `This action updates a #${id} lineEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} lineEvent`;
  }
}
