import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async googleLogin(req, res): Promise<object> {
    if (!req.user) {
      return { message: 'No user from google' };
    }

    const userData = req.user; // assuming req.user contains the user data you want to send

    try {
      const response = await lastValueFrom(this.httpService.post('http://localhost:3001/v1/user/google-register', userData));
      const token = response.data; // Extract the token from the response

      console.log('token is', token);
      res.cookie('token', token, { httpOnly: true }); // Set the token in a cookie

      return {
        message: 'User information from google',
        user: req.user,
        token,
      };
    } catch (error) {
      console.error('Error while  calling google-register API:', error.message);
      return { message: 'Error while processing google login' };
    }
  }
}
