package com.example.demo.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "your-secret-key-your-secret-key";  // Use a strong key
    private static final long EXPIRATION_TIME = 86400000; // 1 day


    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public SecretKey getSigningKey() {
        // Use the secretKeyFor method to generate a secure key for HMAC-SHA-256
        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }


    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
