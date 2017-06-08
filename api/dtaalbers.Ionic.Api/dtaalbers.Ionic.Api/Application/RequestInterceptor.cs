using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace dtaalbers.Ionic.Api.Application
{
    public class RequestInterceptor
    {
        private readonly RequestDelegate _next;

        public RequestInterceptor(RequestDelegate next) => _next = next;

        public async Task Invoke(HttpContext context)
        {
            try
            {
                Logger.Information($"Path: {context.Request.Path}", "RequestInterceptor");
                Logger.Information($"IP: {context.Connection.RemoteIpAddress}", "RequestInterceptor");
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                Logger.Error($"Error: {ex.Message} Stacktrace: {ex.StackTrace}", "RequestInterceptor");
                context.Response.StatusCode = 500;
            }
        }
    }
}