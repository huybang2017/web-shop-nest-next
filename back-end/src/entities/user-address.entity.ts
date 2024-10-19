import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.entity';
import { User } from './site-user.entity';

@Entity('user_address')
export class UserAddress {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  is_default: boolean;
}
