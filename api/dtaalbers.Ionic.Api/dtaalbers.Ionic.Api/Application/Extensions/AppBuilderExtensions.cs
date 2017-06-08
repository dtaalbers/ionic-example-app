using System;
using Microsoft.AspNetCore.Builder;

namespace dtaalbers.Ionic.Api.Application.Extensions
{
    public static class AppBuilderExtensions
    {
		public static IApplicationBuilder UseRequestInterceptor(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<RequestInterceptor>();
		}
    }
}
