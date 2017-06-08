using System.IO;
using Serilog;

namespace dtaalbers.Ionic.Api.Application
{
    /// <summary>
    /// Global logger that logs to
    /// </summary>
    public static class Logger
    {
        private static string Application { get; set; }

        /// <summary>
        /// Register a logger instance
        /// </summary>
        /// <param name="application">The name of the application using the logger</param>
        /// <param name="path">The path to put the log files</param>
        public static void Register(string application, string path)
        {
            if (!Directory.Exists(path)) throw new DirectoryNotFoundException(path);

            // Set application
            Application = application;

            var log = new LoggerConfiguration()
                .WriteTo.RollingFile(Path.Combine(path, "log_{Date}.txt"))
                .CreateLogger();
            Log.Logger = log;
        }

        /// <summary>
        /// Log a informative message
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="function">The function the message is being logged from</param>
        public static void Information(string message, string function)
            => Log.Information($"[dtaalbers.Ionic.{Application}/{function}] {message} ");

        /// <summary>
        /// Log an error message
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="function">The function the message is being logged from</param>
        public static void Error(string message, string function)
            => Log.Error($"[dtaalbers.Ionic.{Application}/{function}] {message} ");

        /// <summary>
        /// Log a debug message
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="function">The function the message is being logged from</param>
        public static void Debug(string message, string function)
            => Log.Debug($"[dtaalbers.Ionic.{Application}/{function}] {message} ");
    }
}