function durationToSeconds(duration) {
  if (!duration) return 0;

  const parts = String(duration).split(":").map(Number);

  // MM:SS
  if (parts.length === 2) {
    const [minutes, seconds] = parts;

    return (minutes || 0) * 60 + (seconds || 0);
  }

  // HH:MM:SS
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;

    return (
      (hours || 0) * 3600 +
      (minutes || 0) * 60 +
      (seconds || 0)
    );
  }

  return Number(duration) || 0;
}

module.exports = {
  durationToSeconds,
};