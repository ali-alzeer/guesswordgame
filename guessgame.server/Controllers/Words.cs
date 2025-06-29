using guessgame.data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using static guessgame.data.AdminData;

namespace guessgame.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Words : ControllerBase
    {
        [HttpGet("{NumberOfLetters}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<WordDto> GetRandomWord(byte NumberOfLetters)
        {
            return guessgame.business.WordBusiness.GetRandomWord(NumberOfLetters);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WordModel>>> GetAll([FromHeader] string First, [FromHeader] string Second, string OrderBy, bool Desc)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var WordList = await guessgame.business.WordBusiness.GetAll(OrderBy, Desc);
                if (WordList != null)
                {
                    return Ok(WordList);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }
        }

        [HttpGet("page")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WordModel>>> GetPage([FromHeader] string First, [FromHeader] string Second, string OrderBy, int PageNumber, int PageSize, bool Desc)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var WordList = await guessgame.business.WordBusiness.GetPage(OrderBy, PageNumber, PageSize, Desc);
                if (WordList != null)
                {
                    return Ok(WordList);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }

        }

        [HttpGet("letterscount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WordModel>>> GetWordsByLettersCount([FromHeader] string First, [FromHeader] string Second, byte LettersCount, string OrderBy, bool Desc)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var WordList = await guessgame.business.WordBusiness.GetWordsByLettersCount(LettersCount, OrderBy, Desc);
                if (WordList != null)
                {
                    return Ok(WordList);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<int>> Post([FromHeader] string First, [FromHeader] string Second, string Word, string Description)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var RowsAffected = await guessgame.business.WordBusiness.Post(Word, Description);
                if (RowsAffected > 0)
                {
                    return Ok(RowsAffected);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<int>> Put([FromHeader] string First, [FromHeader] string Second, int Id, string Word, string Description)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var RowsAffected = await guessgame.business.WordBusiness.Put(Id, Word, Description);
                if (RowsAffected > 0)
                {
                    return Ok(RowsAffected);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }

        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<int>> DeleteWord([FromHeader] string First, [FromHeader] string Second, int Id)
        {
            Admin admin = new Admin(First, Second);

            if (guessgame.business.AdminBusiness.GetAdmin(admin))
            {
                var RowsAffected = await guessgame.business.WordBusiness.DeleteWord(Id);
                if (RowsAffected > 0)
                {
                    return Ok(RowsAffected);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return Unauthorized(false);
            }

        }
    }
}
