using guessgame.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static guessgame.data.AdminData;

namespace guessgame.business
{
    public class AdminBusiness
    {
        public static bool GetAdmin(Admin admin)
        {
            return AdminData.GetAdmin(admin);
        }
    }
}
