package com.example.demo.security;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class JwtAuthentication extends AbstractAuthenticationToken {
    private final String email;  // The authenticated user's email

    public JwtAuthentication(String email) {
        super(null); // No authorities at this stage
        this.email = email;
        setAuthenticated(true); // Mark as authenticated
    }

    public JwtAuthentication(String email, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.email = email;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;  // No credentials needed for JWT authentication
    }

    @Override
    public Object getPrincipal() {
        return email; // The principal is the email
    }
}
