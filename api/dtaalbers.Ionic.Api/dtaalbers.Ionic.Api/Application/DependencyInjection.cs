using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace dtaalbers.Ionic.Api.Application
{
    public static class DependencyInjection
    {
        public static void Inject(IServiceCollection services, IConfigurationRoot configuration)
        {
            // Register the api settings
            services.Configure<ApiSettings>(configuration.GetSection("ApiSettings"));
        }
    }
}