using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Posts_Website.Exceptions;

namespace Posts_Website.Filters
{
    public class EntityNotFoundExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is EntityNotFoundException)
            {
                context.Result = new NotFoundResult();
            }
        }
    }
}
