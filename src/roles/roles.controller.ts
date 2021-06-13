import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Post()
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }

  @ApiTags("CRUD-OPERATION-IN-RULES")
  @ApiOperation({summary: "Find All Rules"})
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiTags("CRUD-OPERATION-IN-RULES")
  @ApiOperation({summary: "Find A Role By Id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
  
  @ApiTags("CRUD-OPERATION-IN-RULES")
  @ApiOperation({summary: "Role Update By Id"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
  
  @ApiTags("CRUD-OPERATION-IN-RULES")
  @ApiOperation({summary: "Role Delete By Id"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @ApiOperation({summary: "RULES-INSERTION"})
  @Post()
  // add( @Body() role: CreateRoleDto , @Request() req: any){
  add( @Body() role: CreateRoleDto ){
    try{
      // console.log(role);
      return this.rolesService.add(role);
    }
    catch(err){
      console.log(err);
    }
  }
}
