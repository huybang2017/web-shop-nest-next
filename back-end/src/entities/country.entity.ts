import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.entity';

@Entity('country')
export class Country {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  country_name: string;

  @OneToMany(() => Address, (address) => address.country)
  addresses: Address[];
}
