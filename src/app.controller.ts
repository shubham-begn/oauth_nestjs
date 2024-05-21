import { GoogleOAuthGuard } from './google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'console';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {
    console.log("Hiiting this route");
    
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    console.log("Hiiting this routess");

    return this.appService.googleLogin(req);
  }
}
