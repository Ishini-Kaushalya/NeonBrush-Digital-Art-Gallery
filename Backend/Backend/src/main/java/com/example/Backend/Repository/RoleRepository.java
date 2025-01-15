package com.example.Backend.Repository;

        import java.util.Optional;
        import org.springframework.data.mongodb.repository.MongoRepository;
        import com.example.Backend.Model.ERole;
        import com.example.Backend.Model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
