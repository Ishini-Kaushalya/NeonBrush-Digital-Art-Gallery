package com.example.Backend.Security.Services;

        import org.springframework.stereotype.Service;

        import java.util.Set;
        import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklist {
    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}