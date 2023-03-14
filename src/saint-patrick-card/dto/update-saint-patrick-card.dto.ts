import { PartialType } from '@nestjs/mapped-types';
import { CreateSaintPatrickCardDto } from './create-saint-patrick-card.dto';

export class UpdateSaintPatrickCardDto extends PartialType(CreateSaintPatrickCardDto) {}
