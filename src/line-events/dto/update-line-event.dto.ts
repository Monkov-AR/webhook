import { PartialType } from '@nestjs/mapped-types';
import { CreateLineEventDto } from './create-line-event.dto';

export class UpdateLineEventDto extends PartialType(CreateLineEventDto) {}
