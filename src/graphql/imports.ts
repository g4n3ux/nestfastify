import { Module } from "@nestjs/common";
import { GlobalsModule } from "./globals/globals.module";
import { UsersModule } from "./users/users.module";


@Module({
    imports:[
        GlobalsModule,
        UsersModule
    ]
})
export class imports{}