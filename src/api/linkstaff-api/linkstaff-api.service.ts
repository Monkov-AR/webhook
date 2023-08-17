import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class LinkstaffApiService {
    async getVacancies() {
        const configService = new NestConfigService();
        try {
            const response = await axios.get(configService.get<string>('LINKSTAFF_URL'));
            const vacancies = response.data.data.map((item) => {
                let image_url;

                if (item.attributes.vacancy_image.data != null) {
                    image_url =
                        'https://linkstaff.biz:1443' + item.attributes.vacancy_image.data[0].attributes.formats.medium.url;
                }

                return {
                    id: item.id,
                    heroImgUrl:
                        image_url ||
                        'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                    title: item.attributes.title,
                    companyName: item.attributes.company_name,
                    salary:
                        item.attributes.salary_min + '万~' + item.attributes.salary_max + '万',
                    skills: 'Java, PHP',
                    address: '東京都千代田区岩本町',
                    vacancyType: '正社員',
                    japaneseLevel: 'N2',
                };
            });

            return vacancies;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
}

