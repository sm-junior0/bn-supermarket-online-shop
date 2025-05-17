package com.sheja.supermarket.service;

import com.sheja.supermarket.model.Customer;
import com.sheja.supermarket.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

//    private BcryptPasswordEncoder bcryptPasswordEncoder = new BcryptPasswordEncoder();

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    private String hashPassword(String password) {
        int hash = 7;
        int salt = 31; // simple salt
        for (char c : password.toCharArray()) {
            hash = hash * salt + c;
        }
        return Integer.toHexString(hash);
    }

    public Customer saveCustomer(Customer customer) {
        customer.setPassword(hashPassword(customer.getPassword()));
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }
} 
 