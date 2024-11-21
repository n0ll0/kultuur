export default function GET() {
  return {
    props: {
      events: [
        {
          id: 1,
          title: "Kultuurillisten syndymusten tapahtumat",
          description: "Tämä on kultuurillisten syndymusten tapahtumien tarkastelu.",
          coordinates: [60.1699, 24.9384],
        },
        // Add more events as needed
      ],
    },
  };
}