package com.example.barbershopapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.barbershopapp.ui.*
import com.example.barbershopapp.ui.screens.ClientHomeScreen
import com.example.barbershopapp.ui.theme.BarberShopAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BarberShopAppTheme {
                val navController = rememberNavController()
                NavHost(navController, startDestination = "login") {
                    composable("login") {
                        LoginScreen(
                            onLogin = { role ->
                                if (role == "admin") {
                                    navController.navigate("admin") {
                                        popUpTo("login") { inclusive = true }
                                    }
                                } else {
                                    navController.navigate("clientHome") {
                                        popUpTo("login") { inclusive = true }
                                    }
                                }
                            },
                            onNavigateToRegister = { navController.navigate("register") }
                        )
                    }
                    composable("register") {
                        RegisterScreen(
                            onRegister = { name, email, password ->
                                // Aquí luego conectarás con Firebase Auth
                                navController.navigate("login") { popUpTo("register") { inclusive = true } }
                            },
                            onBackToLogin = { navController.popBackStack("login", inclusive = false) }
                        )
                    }
                    composable("clientHome") { ClientHomeScreen() }
                    composable("admin") { AdminScreen(navController) }
                }
            }
        }
    }
}