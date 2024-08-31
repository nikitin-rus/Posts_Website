namespace Posts_Website.Helpers
{
    public static class QueryHelper
    {
        public static int GetPages(int count, int limit)
        {
            return (count + limit - 1) / limit;
        }

        public static int GetOffset(int page, int limit)
        {
            return (page - 1) * limit;
        }

        public static int NormalizeLimit(int limit, int minValue, int maxValue)
        {
            if (limit < minValue || limit > maxValue)
            {
                return maxValue;
            }

            return limit;
        }

        public static int NormalizePage(int page, int minValue, int maxValue)
        {
            if (page < minValue || page > maxValue)
            {
                return minValue;
            }

            return page;
        }
    }
}