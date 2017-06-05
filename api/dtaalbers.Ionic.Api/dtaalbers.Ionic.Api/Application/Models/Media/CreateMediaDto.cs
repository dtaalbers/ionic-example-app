using System;
using Microsoft.AspNetCore.Http;

namespace dtaalbers.Ionic.Api.Application.Models.Media
{
    public class CreateMediaDto
    {
        /// <summary>
        /// The media file to save
        /// </summary>
        public IFormFile File { get; set; }
    }
}
