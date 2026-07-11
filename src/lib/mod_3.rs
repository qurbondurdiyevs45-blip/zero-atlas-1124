// Zero Atlas — module 3
use std::collections::HashMap;

pub struct Cache<K: std::hash::Hash + Eq, V: Clone> { inner: HashMap<K, V>, cap: usize }

impl<K: std::hash::Hash + Eq, V: Clone> Cache<K,V> {
    pub fn new(cap: usize) -> Self { Self { inner: HashMap::with_capacity(cap), cap } }
    pub fn get(&self, k: &K) -> Option<V> { self.inner.get(k).cloned() }
    pub fn put(&mut self, k: K, v: V) {
        if self.inner.len() >= self.cap { if let Some(first) = self.inner.keys().next().cloned() { self.inner.remove(&first); } }
        self.inner.insert(k, v);
    }
}

fn main() {
    let mut c = Cache::new(3);
    c.put("hello", "zero-atlas-1124");
    println!("cache: {:?}", c.get(&"hello"));
}