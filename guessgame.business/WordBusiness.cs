using guessgame.data;

namespace guessgame.business
{
    public class WordBusiness
    {
        public static WordDto GetRandomWord(byte NumberOfLetters)
        {
            return guessgame.data.WordData.GetRandomWord(NumberOfLetters);
        }

        public async static Task<List<WordModel>> GetAll(string OrderBy, bool Desc)
        {
            return await guessgame.data.WordData.GetAll(OrderBy, Desc);
        }
        public async static Task<List<WordModel>> GetPage(string OrderBy, int PageNumber, int PageSize, bool Desc)
        {
            return await guessgame.data.WordData.GetPage(OrderBy, PageNumber, PageSize, Desc);
        }

        public async static Task<List<WordModel>> GetWordsByLettersCount(byte LettersCount, string OrderBy, bool Desc)
        {
            return await guessgame.data.WordData.GetWordsByLettersCount(LettersCount, OrderBy, Desc);
        }


        public async static Task<int> Post(string Word, string Description)
        {
            return await guessgame.data.WordData.Post(Word, Description);
        }
        public async static Task<int> Put(int Id, string Word, string Description)
        {
            return await guessgame.data.WordData.Put(Id, Word, Description);
        }
        public async static Task<int> DeleteWord(int Id)
        {
            return await guessgame.data.WordData.DeleteWord(Id);
        }
    }
}
