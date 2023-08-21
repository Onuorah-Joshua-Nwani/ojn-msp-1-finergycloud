function toggleCollapseAndCarousel(index, collapseId) {
    var collapseElement = document.getElementById(collapseId);
    var isCollapsed = collapseElement.classList.contains('show');

    if (isCollapsed) {
        var myCarousel = document.getElementById('carouselExampleCaptions');
        var carousel = new bootstrap.Carousel(myCarousel);
        carousel.to(index);
    }

    var collapse = new bootstrap.Collapse(collapseElement, { toggle: true });
}