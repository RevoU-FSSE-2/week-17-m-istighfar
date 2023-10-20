function findMinimum(n, a, b) {
    const boys_weights = b.filter((_, index) => a[index] === 0);
    const girls_weights = b.filter((_, index) => a[index] === 1).sort((x, y) => x - y);

    function binary_search(weights, x) {
        let low = 0,
            high = weights.length - 1;
        let closest = Infinity;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (weights[mid] === x) {
                return x;
            } else if (weights[mid] < x) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            if (Math.abs(weights[mid] - x) < Math.abs(closest - x)) {
                closest = weights[mid];
            }
        }

        return closest;
    }

    let min_diff = Infinity;
    for (let weight of boys_weights) {
        const girl_weight = binary_search(girls_weights, weight);
        min_diff = Math.min(min_diff, Math.abs(girl_weight - weight));
    }

    return min_diff;
}

exports.findMinimum = findMinimum;
