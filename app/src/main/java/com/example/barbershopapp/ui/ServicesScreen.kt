package com.example.barbershopapp.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.barbershopapp.viewmodel.ServiceViewModel
import androidx.navigation.NavController

@Composable
fun ServicesScreen(
    navController: NavController,
    serviceViewModel: ServiceViewModel = viewModel()
) {
    val services by serviceViewModel.services.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Elige tu servicio", style = MaterialTheme.typography.titleLarge)
        Spacer(Modifier.height(16.dp))
        services.forEach { service ->
            Card(
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
                    .clickable {
                        // Navega al calendario, pasando el id del servicio
                        navController.navigate("calendar/${service.id}")
                    }
            ) {
                Row(
                    Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(service.name, style = MaterialTheme.typography.bodyLarge)
                    Spacer(Modifier.weight(1f))
                    Button(onClick = {
                        navController.navigate("calendar/${service.id}")
                    }) {
                        Text("Agendar")
                    }
                }
            }
        }
    }
}