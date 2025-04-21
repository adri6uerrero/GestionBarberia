package com.example.barbershopapp.viewmodel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import com.example.barbershopapp.model.Service

class ServiceViewModel : ViewModel() {
    private val _services = MutableStateFlow(
        listOf(
            Service(1, "Corte"),
            Service(2, "Corte + Barba"),
            Service(3, "Corte + Cejas"),
            Service(4, "Cejas"),
            Service(5, "Barba"),
            Service(6, "Corte + Barba + Cejas"),
            Service(7, "Barba + Cejas")
        )
    )
    val services: StateFlow<List<Service>> = _services
}