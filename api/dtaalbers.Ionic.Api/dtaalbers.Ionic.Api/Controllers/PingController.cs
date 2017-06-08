using Microsoft.AspNetCore.Mvc;

namespace dtaalbers.Ionic.Api.Controllers
{
    [Route("ping")]
    public class PingController : Controller
    {
        /// <summary>
        /// Call this function to check if the api is available
        /// </summary>
        /// <returns></returns>
        public ActionResult Get() => Ok("pong");
    }
}