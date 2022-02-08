pub fn get_id(n: usize, s: &str) -> String {
    let hash = s
        .chars()
        .map(|ch| ch as u32)
        .reduce(|acc, i| acc + i)
        .unwrap_or_default();

    format!("{n}_{hash:x}")
}
