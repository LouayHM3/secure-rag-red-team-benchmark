export function embedText(text) {
  const vector = Array.from({ length: 8 }, (_, index) => text.toLowerCase().split('').reduce((sum, char, charIndex) => sum + char.charCodeAt(0) * ((charIndex + index) % 7 + 1), 0) % 1000);
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0)) || 1;
  return vector.map(value => Number((value / magnitude).toFixed(6)));
}

export function cosineSimilarity(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

export function buildVectorSearchRequest(query, index = 'soc-knowledge') {
  return { index, knn: { field: 'embedding', query_vector: embedText(query), k: 5, num_candidates: 20 }, _source: ['id', 'title', 'text', 'trusted', 'source'] };
}
