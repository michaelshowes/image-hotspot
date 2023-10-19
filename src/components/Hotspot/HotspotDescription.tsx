import { HotspotProps } from './Hotspot';

export default function HotspotDescription({
  data,
  index
}: {
  data: HotspotProps;
  index: number;
}) {
  return (
    <div className={'flex max-w-[400px] items-center gap-4'}>
      <div
        className={
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700 text-sm font-bold text-white'
        }
        style={{
          borderColor: data.isEditing ? 'red' : 'white',
          backgroundColor: data.isEditing ? 'red' : '#374151'
        }}
      >
        {index + 1}
      </div>
      <p
        className={
          'w-max min-w-[300px] border-l-2 border-gray-700 bg-gray-200 p-4 text-sm'
        }
        style={{
          borderLeftColor: data.isEditing ? 'red' : '#374151'
        }}
      >
        {data.description}
      </p>
    </div>
  );
}
