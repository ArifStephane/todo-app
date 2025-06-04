import { Migration } from '@mikro-orm/migrations';

export class Migration20250528153411 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "title" varchar(255) not null, "description" text not null, "done" boolean not null default false, "created_at" timestamptz(0) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task";');
  }

}
