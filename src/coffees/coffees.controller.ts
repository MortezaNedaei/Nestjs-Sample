import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Constants } from '../constants/Constants';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags(Constants.Routes.Coffees)
@Controller(Constants.Routes.Coffees)
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get(Constants.Routes.Flavors)
  @ApiOperation({ summary: 'Retrieves all coffees' })
  findAll(@Query() paginationQuery: { offset: number; limit: number }) {
    const { offset, limit } = paginationQuery || {};
    return this.coffeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'gets one coffee by id' })
  findOne(@Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  @Post()
  @ApiOperation({ summary: 'Creates new coffee' })
  create(@Body() dto: CreateCoffeeDto) {
    return this.coffeesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a coffee by id and new object' })
  update(@Param('id') id: string, @Body() dto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes a coffee by id' })
  delete(@Param('id') id: string) {
    return this.coffeesService.delete(id);
  }
}
