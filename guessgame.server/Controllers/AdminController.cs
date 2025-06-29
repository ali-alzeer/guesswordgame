using guessgame.data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static guessgame.data.AdminData;

namespace guessgame.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<bool> GetAdmin([FromHeader] string First, [FromHeader] string Second)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                return Ok(true);
            }
            else
            {
                return Unauthorized(false);
            }
        }
    }
}
