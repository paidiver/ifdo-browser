'use client';

export function ImageOrDatasetField(field: { name: string; value: any }) {
  function renderCard(obj: Record<string, any>, keyPrefix = '') {
    const uriKey = Object.keys(obj).find(k => k.toLowerCase().includes('uri'));
    const uri = uriKey ? obj[uriKey] : null;

    const content = (
      <div
        key={keyPrefix}
        className="p-4 border rounded shadow-sm mb-2 break-words break-all whitespace-normal"
      >
        {Object.entries(obj).map(([k, v]) => (
          <p key={`${keyPrefix}-${k}`} className="break-words break-all whitespace-normal">
            <strong>{k}:</strong> {typeof v === 'object' ? JSON.stringify(v) : String(v)}
          </p>
        ))}
      </div>
    );

    return uri ? (
      <a href={uri} target="_blank" rel="noopener noreferrer" key={keyPrefix} className="block">
        {content}
      </a>
    ) : (
      content
    );
  }

  if (Array.isArray(field.value)) {
    if (field.value.every(item => typeof item === 'object' && item !== null)) {
      return (
        <div>
          <strong>{field.name}:</strong>
          {field.value.map((item, i) => renderCard(item, `${field.name}-${i}`))}
        </div>
      );
    }
    return (
      <p>
        <strong>{field.name}:</strong> {JSON.stringify(field.value)}
      </p>
    );
  }

  if (typeof field.value === 'object' && field.value !== null) {
    return (
      <div>
        <strong>{field.name}:</strong>
        {renderCard(field.value, field.name)}
      </div>
    );
  }

  return (
    <p>
      <strong>{field.name}:</strong> {String(field.value)}
    </p>
  );
}
