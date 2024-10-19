import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from './country.entity';
import { ShopOrder } from './shop-order.entity';
import { UserAddress } from './user-address.entity';

@Entity('address')
export class Address {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  unit_number: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  street_number: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  address_line1: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: true })
  address_line2: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  city: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  region: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  postal_code: string;

  @ManyToOne(() => Country, (country) => country.addresses)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => ShopOrder, (order) => order.shippingAddress)
  orders: ShopOrder[];

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: UserAddress[];
}
