import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { REQUEST } from '@nestjs/core';

@ApiTags(Constants.Routes.Coffees)
@Controller(Constants.Routes.Coffees)
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request, // can be used when di scope is Scope.REQUEST
  ) {}

  @Get(Constants.Routes.Flavors)
  @ApiOperation({ summary: 'Retrieves all coffees' })
  findAll(@Query() paginationQuery: { offset: number; limit: number }) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'gets one coffee by id' })
  findOne(@Param('id') id: number) {
    const coffee = this.coffeesService.findOne('' + id);
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
  update(@Param('id') id: number, @Body() dto: UpdateCoffeeDto) {
    return this.coffeesService.update('' + id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes a coffee by id' })
  delete(@Param('id') id: number) {
    return this.coffeesService.delete('' + id);
  }
}
