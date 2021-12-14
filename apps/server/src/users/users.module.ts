import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users/users.resolver';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [HttpModule],
  providers: [
    { provide: 'USERS_SERVICE', useClass: UsersService },
    UsersResolver,
  ],
})
export class UsersModule {}
