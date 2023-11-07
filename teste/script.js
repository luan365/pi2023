const seats = document.querySelectorAll('.seat');
const bookButton = document.getElementById('book-button');

seats.forEach((seat) => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('empty')) {
            return;
        }

        seat.classList.toggle('selected');
    });
});

bookButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('Por favor, selecione um assento.');
    } else {
        alert('Assentos reservados: ' + selectedSeats.length);
        // Aqui você pode enviar os dados dos assentos reservados para o servidor, se necessário.
    }
});
