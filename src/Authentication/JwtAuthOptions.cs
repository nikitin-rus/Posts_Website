﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Posts_Website.Authentication
{
	public static class JwtAuthOptions
	{
		// Должно быть защищено и спрятано
		const string JWT_SECRET_KEY = "secretkeysecretkeysecretkeysecretkeysecretkey";

		public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
			new(Encoding.UTF8.GetBytes(JWT_SECRET_KEY));
	}
}
