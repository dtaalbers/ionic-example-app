﻿using System.IO;
using System.Threading.Tasks;
using dtaalbers.Ionic.Api.Application;
using dtaalbers.Ionic.Api.Application.Models.Media;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace dtaalbers.Ionic.Api.Controllers
{
    [Route("media")]
    public class MediaController : Controller
    {
        private readonly ApiSettings _apiSettings;

        /// <summary>
        /// The media controller constructor
        /// </summary>
        /// <param name="options">The api configuration settings</param>
        public MediaController(IOptions<ApiSettings> options)
        {
            _apiSettings = options.Value;
        } 
        
        /// <summary>
        /// Saves a new media file
        /// </summary>
        /// <param name="media">The media file to save</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post(CreateMediaDto media)
        {
            if (media?.File == null) return BadRequest("Unable to find media");
            
            if (!Directory.Exists(_apiSettings.UploadsDirectory)) Directory.CreateDirectory(_apiSettings.UploadsDirectory);

            // Create full path and save the original media file
            var orignal = Path.Combine(_apiSettings.UploadsDirectory, media.File.FileName);
            using (var stream = new FileStream(orignal, FileMode.Create))
                await media.File.CopyToAsync(stream);
            
            return Ok();
        }
    }
}