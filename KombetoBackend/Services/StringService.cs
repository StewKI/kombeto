namespace KombetoBackend.Services;

public static class StringService
{
    public static int LevenshteinDistance(this string source, string target)
    {
        if (string.IsNullOrEmpty(source))
            return string.IsNullOrEmpty(target) ? 0 : target.Length;
        if (string.IsNullOrEmpty(target))
            return source.Length;

        int n = source.Length;
        int m = target.Length;
        int[,] dp = new int[n + 1, m + 1];

        // Initialize base cases
        for (int i = 0; i <= n; i++)
            dp[i, 0] = i;
        for (int j = 0; j <= m; j++)
            dp[0, j] = j;

        // Fill dp table
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                int cost = source[i - 1] == target[j - 1] ? 0 : 1;

                dp[i, j] = Math.Min(
                    Math.Min(dp[i - 1, j] + 1,    // Deletion
                        dp[i, j - 1] + 1),   // Insertion
                    dp[i - 1, j - 1] + cost); // Substitution
            }
        }

        return dp[n, m];
    }
}