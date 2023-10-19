export type HotspotProps = {
  id: string;
  description: string;
  isEditing: boolean;
};

export default function Hotspot({
  data,
  index
}: {
  data: HotspotProps;
  index: number;
}) {
  return (
    <div
      id={data.id}
      className={
        'flex h-8 w-8 items-center justify-center rounded-full border-2 bg-black text-xl font-bold text-white'
      }
      style={{
        borderColor: data.isEditing ? 'red' : 'white',
        backgroundColor: data.isEditing ? 'red' : 'black'
      }}
    >
      {index + 1}
    </div>
  );
}
