function GetSportColor(sport_type: string): string {
    switch (sport_type) {
        case 'AlpineSki': return '#b58300';  // Goldenrod
        case 'BackcountrySki': return '#C70039';  // Dark Red
        case 'Badminton': return '#FFC300';  // Bright Yellow
        case 'Canoeing': return '#1E90FF';  // Dodger Blue
        case 'Crossfit': return '#4CAF50';  // Green
        case 'EBikeRide': return '#8A2BE2';  // Blue-Violet
        case 'Elliptical': return '#FF69B4';  // Hot Pink
        case 'EMountainBikeRide': return '#FFA07A';  // Light Salmon
        case 'Golf': return '#228B22';  // Forest Green
        case 'GravelRide': return '#D2691E';  // Chocolate
        case 'Handcycle': return '#00BFFF';  // Deep Sky Blue
        case 'HighIntensityIntervalTraining': return '#FF4500';  // Orange Red
        case 'Hike': return '#7B68EE';  // Medium Slate Blue
        case 'IceSkate': return '#00CED1';  // Dark Turquoise
        case 'InlineSkate': return '#8B4513';  // Saddle Brown
        case 'Kayaking': return '#4682B4';  // Steel Blue
        case 'Kitesurf': return '#6B8E23';  // Olive Drab
        case 'MountainBikeRide': return '#4682B4';  // Steel Blue
        case 'NordicSki': return '#708090';  // Slate Gray
        case 'Pickleball': return '#9370DB';  // Medium Purple
        case 'Pilates': return '#FFB6C1';  // Light Pink
        case 'Racquetball': return '#9932CC';  // Dark Orchid
        case 'Ride': return '#4169E1';  // Royal Blue
        case 'RockClimbing': return '#A52A2A';  // Brown
        case 'RollerSki': return '#2E8B57';  // Sea Green
        case 'Rowing': return '#B22222';  // Firebrick
        case 'Run': return '#fc4c02';  // Orange strava
        case 'Sail': return '#1E90FF';  // Dodger Blue
        case 'Skateboard': return '#DAA520';  // Goldenrod
        case 'Snowboard': return '#4682B4';  // Steel Blue
        case 'Snowshoe': return '#5F9EA0';  // Cadet Blue
        case 'Soccer': return '#008000';  // Green
        case 'Squash': return '#D2691E';  // Chocolate
        case 'StairStepper': return '#FF7F50';  // Coral
        case 'StandUpPaddling': return '#20B2AA';  // Light Sea Green
        case 'Surfing': return '#1E90FF';  // Dodger Blue
        case 'Swim': return '#4682B4';  // Steel Blue
        case 'TableTennis': return '#FFD700';  // Gold
        case 'Tennis': return '#32CD32';  // Lime Green
        case 'TrailRun': return '#808000';  // Olive
        case 'Velomobile': return '#696969';  // Dim Gray
        case 'VirtualRide': return '#778899';  // Light Slate Gray
        case 'VirtualRow': return '#708090';  // Slate Gray
        case 'VirtualRun': return '#A9A9A9';  // Dark Gray
        case 'Walk': return '#FF4500';  // Orange Red
        case 'WeightTraining': return '#6A5ACD';  // Slate Blue
        case 'Wheelchair': return '#8B0000';  // Dark Red
        case 'Windsurf': return '#1E90FF';  // Dodger Blue
        case 'Workout': return '#800080';  // Purple
        case 'Yoga': return '#BA55D3';  // Medium Orchid
        default: return '#000000';  // Default to black if sport_type is not recognized
    }
}

export default GetSportColor;