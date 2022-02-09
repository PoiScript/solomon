use std::{collections::hash_map::DefaultHasher, hash::Hasher};

pub fn get_id(n: usize, s: &str) -> String {
    let mut hasher = DefaultHasher::new();

    for c in s.chars() {
        hasher.write_u32(c as u32);
    }

    format!("{n:02x}{:.6x}", hasher.finish() as u32)
}
