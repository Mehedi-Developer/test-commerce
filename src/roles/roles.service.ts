import { Roles } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ){}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findOne(id: number) {
    return this.rolesRepository.findOne(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.rolesRepository.delete(id);
  }

  add( role: CreateRoleDto ){
    const roleObj = new Roles()
    roleObj.type = role.type;
    roleObj.position = role.position;
    roleObj.company = role.company;
    return this.rolesRepository.save(roleObj);
  }
}
