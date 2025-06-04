import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  dateOfBirth?: Date;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;
}
