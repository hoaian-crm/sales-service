import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  findAll() {
    return `This action returns all sales`;
  }
}
